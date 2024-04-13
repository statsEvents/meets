export default function handler(request, response) {
  console.log('Cron job is running!'); 
  response.status(200).json({ success: true });
}