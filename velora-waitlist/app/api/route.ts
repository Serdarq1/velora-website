import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json(
            {
                message:
                    "Supabase ayarlari eksik. SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanimlanmali.",
            },
            { status: 500 }
        );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({message: "Girilen e-posta adresi geçersiz."}, {status: 400});
    };

    const { error } = await supabase.from("waitlist_emails").insert({ email });
    if (error) {
        if (error.code == "23505") {
            return NextResponse.json({message: "Bu e-posta adresi zaten kayıtlı."}, { status: 409 });
        };
    return NextResponse.json({message: "Kayıt başarısız"}, { status: 500 });
    };
    return NextResponse.json({ message: "Kaydınız başarıyla alındı. Uygulama yayınlandığında tarafınıza mail gönderilecektir."}, { status: 200 } )
}
