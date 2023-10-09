import { deepMergeConfig } from './deepMergeConfig'
import { LoadFileConfigOptions } from './loadFileConfig.types'
import { prioritizeFormatAndLoad } from './prioritizeFormatAndLoad'
import { processConfig } from './processConfig'

/** Loads the content of a provided file basename without extension and loads based on the priority provided. */
export async function loadFileConfig(location: string, options?: LoadFileConfigOptions): Promise<any> {
  const finalOptions: LoadFileConfigOptions = { formatPriority: ['ts', 'js', 'json', 'yaml', 'yml'], ...options }
  const loadedConfig = await prioritizeFormatAndLoad(location, finalOptions.formatPriority)

  if (loadedConfig) {
    const processedConfig = processConfig(
      loadedConfig,
      finalOptions.cleanOrphanReplaceable,
      finalOptions.selectEnvironment === true ? process.env['NODE_ENV'] : finalOptions.selectEnvironment
    )

    return finalOptions.defaultConfig ? deepMergeConfig(finalOptions.defaultConfig, processedConfig) : processedConfig
  }
}
