"use client"
import ThemeToggle from "../theme/ThemeToggle";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileTabBar from "./MobileTabBar";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import { useSupabaseUser } from "@hooks/useSupabaseUser";
import { Loader2, LogOut, User } from "lucide-react";
import { createBrowserSupabaseClient } from "@lib/supabase/createBrowserClient";
import { useState } from "react";

const Navbar = () => {
    const { user, loading } = useSupabaseUser();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            const supabase = createBrowserSupabaseClient();
            await supabase.auth.signOut();
            window.location.href = "/";
        } catch {
            setIsSigningOut(false);
        }
    };

    return (
        <>
            <nav className="py-4 sticky top-0 backdrop-blur-md shadow-soft z-50">
                <div className="container max-w-full xl:px-10">
                    <div className="flex flex-col xs:flex-row gap-y-5 justify-between items-center">
                        <div className="flex items-center gap-x-10">
                            <Link href="/">
                                <Image src="/images/logo.png" alt="logo" width={100} height={50} />
                            </Link>
                            <ul className="hidden md:flex items-center gap-x-4">
                                <Link href="/jobs" className="text-muted cursor-pointer hover:text-primary transition">فرصت های شغلی</Link>
                                <Link href="/about" className="text-muted cursor-pointer hover:text-primary transition">درباره ما</Link>
                            </ul>
                        </div>

                        <SearchInput />

                        <div className="flex fixed left-1 top-2.5 xs:relative xs:top-0 xs:left-0 items-center gap-x-2">
                            <div className="hidden sm:flex gap-x-2">
                                {loading ? (
                                    <>
                                        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-10 w-20 ml-3 bg-gray-200 rounded animate-pulse" />
                                    </>
                                ) : user ? (
                                    <>
                                        <Link href="/profile">
                                            <Button className="gap-2">
                                                <User size={18} />
                                                پروفایل
                                            </Button>
                                        </Link>
                                        <Button variant="danger" onClick={handleSignOut} className="gap-2">
                                            {isSigningOut ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                </>
                                            ) : (
                                                <>
                                                    <LogOut size={18} />
                                                    خروج
                                                </>
                                            )}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/register/candidate">
                                            <Button variant="primary">کارجویان</Button>
                                        </Link>
                                        <Link href="/auth/register/employer">
                                            <Button variant="primary">کارفرمایان</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            <MobileTabBar user={user} loading={loading} isSigningOut={isSigningOut} onSignOut={handleSignOut} />
        </>
    );
};

export default Navbar;
