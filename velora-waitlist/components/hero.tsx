"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

const Hero = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kayıt başarısız.");
      }

      setMessage("Kaydınız başarıyla alındı.");
      setEmail("")

    }catch (err){
      setMessage(
        err instanceof Error ? err.message : "Bir hata oluştu."
      );
    } finally {
      setIsSubmitting(false);
    };
  };

  return (
    <div className="relative flex h-full max-w-full items-center justify-center overflow-hidden rounded-lg bg-background p-5 sm:p-10 mt-5 sm:mt-20">
      <section className="flex flex-col items-center justify-center space-y-5 sm:space-y-10">
        <div className="w-full text-center px-4 sm:px-0">
          <h1 className="font-sans text-2xl sm:text-4xl lg:text-6xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
            Bekleme listemize katılarak <span className="text-indigo-500">Velora'yı</span> deneyecek ilk kişilerden biri olun.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300">
            Salonunuzun tüm işlemlerini tek panelden yöneterek zaman kazanın, <br />gelmeyen müşteri oranınızı azaltın ve hatasız gelir-gider tablosu tutun.
          </p>
          <form
            className="mt-4 flex flex-col items-center justify-center gap-4 w-full mx-auto py-5 max-w-full "
            onSubmit={handleSubmit}
            method="post"
          >
            <Input
              type="email"
              placeholder="ornek@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full lg:max-w-[400px] py-3 sm:w-[300px] md:w-[350px] lg:w-[400px] min-w-0 h-[45px] flex-1 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 text-sm"
              required
            />
            <Button disabled={isSubmitting} className="w-full mt-2 lg:max-w-[400px] sm:w-[300px] md:w-[350px] lg:w-[400px]" size="lg">
              {isSubmitting ? "Kayıt olunuyor..." : "Kaydol"}
            </Button>
             <div className="w-full flex justify-center">
              {message ? <p className="text-sm text-neutral-600"> {message} </p> : null}
            </div>
            {/* <p className=" text-sm sm:text-lg text-neutral-600 dark:text-neutral-300">
            Bizi sosyal medyada takip edin.
          </p> */}
            {/* <DockLive /> */}
          </form>
         
        </div>
       
      </section>
      
    </div>
  )
}

export default Hero
