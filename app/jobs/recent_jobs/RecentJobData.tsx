import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import RecentJobSlider from "./RecentJobSlider";
import ErrorMessage from "@components/ui/ErrorMessage";

export async function RecentJobData() {

    const supabase = await createSupabaseServerClient();
    const { data: jobs, error } = await supabase
        .from("job_posts")
        .select(`*, employers (company_name)`)
        .order("created_at", { ascending: false })
        .limit(4);

    if (error) {
        return (
            <ErrorMessage message={"خطا در دریافت آخرین آگهی‌ها"} />
        );
    }

    return (
        <RecentJobSlider jobs={jobs ?? []} />
    )
}