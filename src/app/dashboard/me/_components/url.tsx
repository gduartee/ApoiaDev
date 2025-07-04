"use client";
import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { use, useState } from "react";
import Link from "next/link";

interface UrlPreviewProps {
    username: string | null;
}

export default function UrlPreview({ username: slug }: UrlPreviewProps) {
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState(slug)
    async function submitAction(formData: FormData) {
        const username = formData.get("username") as string;

        if (username === "") {
            return;
        }

        const response = await createUsername({ username })

        if (response.error) {
            setError(response.error);
            return;
        }

        if (response.data) {
            setUsername(response.data);
        }

    }

    if (!!username) {
        return (
            <div className="flex items-center flex-1 p-2 text-gray-100">

                <div className="flex items-center justify-center w-full">
                    <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}>
                        {process.env.NEXT_PUBLIC_HOST_URL}/creator/{username}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center flex-1 p-2 text-gray-100">
            <form
                className="flex flex-1 flex-col gap-4 items-center md:flex-row"
                action={submitAction}
            >
                <div className="flex items-center justify-center w-full">
                    <p>
                        {process.env.NEXT_PUBLIC_HOST_URL}/creator/
                    </p>
                    <input
                        type="text"
                        className="flex-1 outline-none border h-9 border-gray-300 text-black rounded-md bg-gray-50 px-1"
                        placeholder="Digite seu username..."
                        name="username"
                    />
                </div>

                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 h-9 w-full md:w-fit px-4 rounded-md cursor-pointer"
                >
                    Salvar
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}