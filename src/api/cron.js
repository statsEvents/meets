import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Путь к вашему файлу конфигурации Firebase

export default async (req, res) => {
  console.log("Cron job is running!");

  try {
    // Ваш код, который нужно выполнить по расписанию
    await setDoc(doc(db, "users", "new"), { capital: true }, { merge: true });
    res.status(200).json({ message: "Cron job completed successfully" });
  } catch (error) {
    console.error("Error running cron job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
