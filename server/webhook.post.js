export default defineEventHandler(async (event) => {
  const body = await readBody(event) // อ่าน payload จาก LINE
  console.log('LINE event:', body)

  // ตอบกลับ LINE ด้วย 200 OK
  return { status: 'ok' }
})