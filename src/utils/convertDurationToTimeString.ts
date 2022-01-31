export function convertDurationToTimeString(duration: number) {
  // quantas horas completas
  const hours = Math.floor(duration / 3600)

  // quantos minutos completos, fora as horas completas
  const minutes = Math.floor((duration % 3600) / 60)

  // duração em segundos, fora as horas e minutos
  const seconds = duration % 60

  const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')

  return timeString
}
