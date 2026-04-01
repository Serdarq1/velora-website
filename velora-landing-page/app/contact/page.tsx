import Navigation from "@/components/Navigation";
import ContactPage from "@/components/ContactPage";
import { Referrals } from "@/components/Referrals";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { CallToAction } from "@/components/CallToAction";

const page = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <div className="p-3">
        <Navigation />
      </div>
      <div className="mt-16 space-y-16">
        <ContactPage />
        <div className="w-full">
          <div className="mb-20">
            {/* <Referrals /> */}
            <Faq />
            <CallToAction />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
