import { ILocales } from './zh-CN'

/* eslint-disable no-template-curly-in-string */
export const EN: ILocales = {
  UPLOAD_FAILED: 'Upload failed',
  CHECK_SETTINGS: 'Please check your settings',
  CHECK_SETTINGS_AND_NETWORK: 'Please check your settings and network',
  UPLOAD_FAILED_REASON: 'Error code: ${code}, please open the browser and paste the address to see the reason',
  SERVER_ERROR: 'Server error, please try again later',
  AUTH_FAILED: 'Authentication failed',

  // smms
  PICBED_SMMS: 'SM.MS',
  PICBED_SMMS_TOKEN: 'Set Token',

  // Ali-cloud
  PICBED_ALICLOUD: 'Ali Cloud',
  PICBED_ALICLOUD_ACCESSKEYID: 'Set KeyId',
  PICBED_ALICLOUD_ACCESSKEYSECRET: 'Set KeySecret',
  PICBED_ALICLOUD_BUCKET: 'Set Bucket',
  PICBED_ALICLOUD_AREA: 'Set Area',
  PICBED_ALICLOUD_PATH: 'Set Path',
  PICBED_ALICLOUD_CUSTOMURL: 'Set Custom URL',
  PICBED_ALICLOUD_OPTIONS: 'Set URL Suffix',

  // Tencent-cloud
  PICBED_TENCENTCLOUD: 'Tencent Cloud',
  PICBED_TENCENTCLOUD_VERSION: 'Choose COS version',
  PICBED_TENCENTCLOUD_SECRETID: 'Set SecretId',
  PICBED_TENCENTCLOUD_SECRETKEY: 'Set SecretKey',
  PICBED_TENCENTCLOUD_APPID: 'Set AppId',
  PICBED_TENCENTCLOUD_BUCKET: 'Set Bucket',
  PICBED_TENCENTCLOUD_AREA: 'Set Area',
  PICBED_TENCENTCLOUD_PATH: 'Set Path',
  PICBED_TENCENTCLOUD_CUSTOMURL: 'Set Custom URL',

  // GitHub
  PICBED_GITHUB: 'GitHub',
  PICBED_GITHUB_TOKEN: 'Set Token',
  PICBED_GITHUB_REPO: 'Set Repo Name',
  PICBED_GITHUB_PATH: 'Set Path',
  PICBED_GITHUB_BRANCH: 'Set Branch',
  PICBED_GITHUB_CUSTOMURL: 'Set Custom URL',

  // qiniu
  PICBED_QINIU: 'Qiniu',
  PICBED_QINIU_ACCESSKEY: 'Set AccessKey',
  PICBED_QINIU_SECRETKEY: 'Set SecretKey',
  PICBED_QINIU_BUCKET: 'Set Bucket',
  PICBED_QINIU_PATH: 'Set Path',
  PICBED_QINIU_URL: 'Set URL',
  PICBED_QINIU_OPTIONS: 'Set URL Suffix',
  PICBED_QINIU_AREA: 'Set Area',

  // imgur
  PICBED_IMGUR: 'Imgur',
  PICBED_IMGUR_CLIENTID: 'Set ClientId',
  PICBED_IMGUR_PROXY: 'Set Proxy',

  // upyun
  PICBED_UPYUN: 'Upyun',
  PICBED_UPYUN_BUCKET: 'Set Bucket',
  PICBED_UPYUN_OPERATOR: 'Set Operator',
  PICBED_UPYUN_PASSWORD: 'Set Operator Password',
  PICBED_UPYUN_PATH: 'Set Path',
  PICBED_UPYUN_URL: 'Set URL',
  PICBED_UPYUN_OPTIONS: 'Set URL Suffix',

  // internal
  PICBED_INTERNAL: 'Internal',
  PICBED_INTERNAL_URL: 'Internal URL',
  PICBED_INTERNAL_VERSION: 'Internal Version',

  // Plugin Handler
  PLUGIN_HANDLER_PLUGIN_INSTALL_SUCCESS: 'Plugin installed successfully',
  PLUGIN_HANDLER_PLUGIN_INSTALL_FAILED: 'Plugin installation failed',
  PLUGIN_HANDLER_PLUGIN_INSTALL_FAILED_REASON: 'Plugin installation failed, error code is ${code}, error log is \n ${data}',
  PLUGIN_HANDLER_PLUGIN_INSTALL_FAILED_PATH: 'Plugin installation failed, please enter a valid plugin name or valid installation path',
  PLUGIN_HANDLER_PLUGIN_UNINSTALL_SUCCESS: 'Plugin uninstalled successfully',
  PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED: 'Plugin uninstall failed',
  PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED_REASON: 'Plugin uninstall failed, error code is ${code}, error log is \n ${data}',
  PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED_VALID: 'Plugin uninstall failed, please enter a valid plugin name',
  PLUGIN_HANDLER_PLUGIN_UPDATE_SUCCESS: 'Plugin updated successfully',
  PLUGIN_HANDLER_PLUGIN_UPDATE_FAILED: 'Plugin update failed',
  PLUGIN_HANDLER_PLUGIN_UPDATE_FAILED_REASON: 'Plugin update failed, error code is ${code}, error log is \n ${data}',
  PLUGIN_HANDLER_PLUGIN_UPDATE_FAILED_VALID: 'Plugin update failed, please enter a valid plugin name'
}
