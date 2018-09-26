import PicGo from '../../core/PicGo'
import request from 'request-promise-native'
import { PluginConfig } from '../../utils/interfaces'
import crypto from 'crypto'
import mime from 'mime-types'

// generate OSS signature
const generateSignature = (options, fileName: string) => {
  const date = new Date().toUTCString()
  const signString = `PUT\n\n${mime.lookup(fileName)}\n${date}\n/${options.bucket}/${options.path}${fileName}`

  const signature = crypto.createHmac('sha1', options.accessKeySecret).update(signString).digest('base64')
  return `OSS ${options.accessKeyId}:${signature}`
}

const postOptions = (options, fileName: string, signature: string, imgBase64: string) => {
  return {
    method: 'PUT',
    url: `https://${options.bucket}.${options.area}.aliyuncs.com/${encodeURI(options.path)}${encodeURI(fileName)}`,
    headers: {
      Host: `${options.bucket}.${options.area}.aliyuncs.com`,
      Authorization: signature,
      Date: new Date().toUTCString(),
      'content-type': mime.lookup(fileName)
    },
    body: Buffer.from(imgBase64, 'base64'),
    resolveWithFullResponse: true
  }
}

const handle = async (ctx: PicGo) => {
  const aliYunOptions = ctx.getConfig('picBed.aliyun')
  if (!aliYunOptions) {
    throw new Error('Can\'t find aliYun OSS config')
  }
  try {
    const imgList = ctx.output
    const customUrl = aliYunOptions.customUrl
    const path = aliYunOptions.path
    for (let i in imgList) {
      const signature = generateSignature(aliYunOptions, imgList[i].fileName)
      const options = postOptions(aliYunOptions, imgList[i].fileName, signature, imgList[i].base64Image)
      let body = await request(options)
      if (body.statusCode === 200) {
        delete imgList[i].base64Image
        if (customUrl) {
          imgList[i]['imgUrl'] = `${customUrl}/${path}${imgList[i].fileName}`
        } else {
          imgList[i]['imgUrl'] = `https://${aliYunOptions.bucket}.${aliYunOptions.area}.aliyuncs.com/${path}${imgList[i].fileName}`
        }
        imgList[i]['type'] = 'aliyun'
      } else {
        throw new Error('Upload failed')
      }
    }
    return ctx
  } catch (err) {
    if (err.error === 'Upload failed') {
      ctx.emit('notification', {
        title: '上传失败！',
        body: `请检查你的配置项是否正确`
      })
    } else {
      ctx.emit('notification', {
        title: '上传失败！',
        body: '请检查你的配置项是否正确'
      })
    }
    throw err
  }
}

const config = (ctx: PicGo): PluginConfig[] => {
  let userConfig = ctx.getConfig('picBed.aliyun')
  if (!userConfig) {
    userConfig = {}
  }
  const config = [
    {
      name: 'accessKeyId',
      type: 'input',
      default: userConfig.accessKeyId || '',
      required: true
    },
    {
      name: 'accessKeySecret',
      type: 'input',
      default: userConfig.accessKeySecret || '',
      required: true
    },
    {
      name: 'bucket',
      type: 'input',
      default: userConfig.bucket || '',
      required: true
    },
    {
      name: 'area',
      type: 'input',
      default: userConfig.area || '',
      required: true
    },
    {
      name: 'path',
      type: 'input',
      default: userConfig.path || '',
      required: false
    },
    {
      name: 'customUrl',
      type: 'input',
      default: userConfig.customUrl || '',
      required: false
    }
  ]
  return config
}

const handleConfig = async (ctx: PicGo) => {
  const prompts = config(ctx)
  const answer = await ctx.cmd.inquirer.prompt(prompts)
  ctx.saveConfig({
    'picBed.aliyun': answer
  })
}

export default {
  name: '阿里云OSS',
  handle,
  handleConfig,
  config
}
