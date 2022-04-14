import db, { DatabaseUrlSettings } from '../database'

export async function addSettings(settings) {
  const refSetting = db.ref(DatabaseUrlSettings)
  return refSetting.child(settings.id).set(settings)
}

export async function updateSettings(settingsId, updated) {
  const ref = db.ref(`${DatabaseUrlSettings}/${settingsId}`)
  let snapshot = await ref.once('value')
  let settings = {
    ...snapshot.val(),
    ...updated,
  }
  await ref.update(settings)
  return settings
}

export async function getSettingsById(settingsId) {
  const ref = db.ref(`${DatabaseUrlSettings}/${settingsId}`)
  let snapshot = await ref.once('value')
  return snapshot.val()
}
