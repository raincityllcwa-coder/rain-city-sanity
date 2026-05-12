import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'u2nxf2rv',
    dataset: 'production'
  },
  deployment: {
    appId: 'xuw08zjdvac55ccmd5z3h099',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
