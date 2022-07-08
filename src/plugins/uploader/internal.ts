import { IPicGo, IPluginConfig, IInternalConfig } from '../../types'
import { Options } from 'request-promise-native'
import { IBuildInEvent } from '../../utils/enum'
import { ILocalesKey } from '../../i18n/zh-CN'
import { v4 } from 'uuid'

const postOptions = (options: IInternalConfig, image: Buffer, ext: string = 'png'): Options => {
  const url = options.url
  const version = options.version ?? 1
  const uuid: string = v4()

  return {
    method: 'PUT',
    url: `${url}/v${version}/${uuid}${ext}`,
    headers: {
      'User-Agent': 'PicGo'
    },
    body: image
  }
}

const handle = async (ctx: IPicGo): Promise<IPicGo> => {
  const internalOptions = ctx.getConfig<IInternalConfig>('picBed.internal')
  if (!internalOptions) {
    throw new Error('Can\'t find internal config')
  }
  try {
    const imgList = ctx.output
    for (const img of imgList) {
      if (img.fileName && img.buffer) {
        let image = img.buffer
        if (!image && img.base64Image) {
          image = Buffer.from(img.base64Image, 'base64')
        }
        const postConfig = postOptions(internalOptions, image, img.extname)
        const body = await ctx.Request.request(postConfig)
        const json = JSON.parse(body)

        if (json.url) {
          delete img.base64Image
          delete img.buffer

          img.imgUrl = json.url
        } else {
          throw new Error('Server error, please try again')
        }
      }
    }
    return ctx
  } catch (err) {
    ctx.emit(IBuildInEvent.NOTIFICATION, {
      title: ctx.i18n.translate<ILocalesKey>('UPLOAD_FAILED'),
      body: ctx.i18n.translate<ILocalesKey>('CHECK_SETTINGS_AND_NETWORK')
    })
    throw err
  }
}

const config = (ctx: IPicGo): IPluginConfig[] => {
  const userConfig = ctx.getConfig<IInternalConfig>('picBed.internal') || {}
  const config: IPluginConfig[] = [
    {
      name: 'url',
      type: 'input',
      alias: ctx.i18n.translate<ILocalesKey>('PICBED_INTERNAL_URL'),
      default: userConfig.url || '',
      required: true
    },
    {
      name: 'version',
      type: 'input',
      alias: ctx.i18n.translate<ILocalesKey>('PICBED_INTERNAL_VERSION'),
      default: userConfig.version || 1,
      required: false
    }
  ]
  return config
}

export default function register (ctx: IPicGo): void {
  ctx.helper.uploader.register('internal', {
    name: ctx.i18n.translate<ILocalesKey>('PICBED_INTERNAL'),
    handle,
    config
  })
}
