const random255 = () => Math.floor(Math.random() * 255)

export default function () {
  const r = random255()
  const g = random255()
  const b = random255()

  return `rgba(${r}, ${g}, ${b}, 0.3)`
}
