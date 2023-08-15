"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Snippet } from "@nextui-org/snippet";

export default function MainPage() {
  const [userUrl, setUserUrl] = useState("");
  const [shortUrlId, setShortUrlId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = useRef("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserUrl(event.target.value);
  };

  const createShortUrl = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api`, {
        method: "POST",
        body: JSON.stringify({
          url: userUrl,
        }),
        cache: "no-store",
      });

      const url = await response.json();
      console.log(url);
      setShortUrlId(url.shortened_url_id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidURL = () => {
    try {
      new URL(userUrl);
      return true;
    } catch (error) {
      return false;
    }
  };

  const testGet = async () => {
    try {
      const response = await fetch(`/api/`, {
        method: "GET",
        cache: "no-store",
      });

      const formattedResponse = await response.json();

      console.log(formattedResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      fetch("/api", {
        method: "GET",
        cache: "no-store",
      });
    })();
    baseUrl.current = window.location.href;
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-16 pb-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black">
      <div className="flex flex-col gap-16 items-center">
        <h1
          className="font-extrabold text-transparent text-center text-5xl sm:text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          onClick={testGet}
        >
          Nora&apos;s URL shortener
        </h1>
        <div className="flex flex-col justify-center items-center gap-4 w-full px-12 max-w-2xl">
          <Input
            isRequired
            label="Your URL"
            variant="bordered"
            size="lg"
            onChange={handleChange}
          ></Input>
          <Button
            isDisabled={!isValidURL()}
            isLoading={isLoading}
            variant="shadow"
            color="primary"
            size="lg"
            className="w-max"
            onClick={createShortUrl}
          >
            {!isLoading ? "Generate short URL" : "Generating"}
          </Button>
        </div>
        <Snippet
          symbol=""
          variant="shadow"
          color="success"
          size="md"
          className={`${
            shortUrlId ? "opacity-100" : "opacity-0"
          } mx-2 max-w-full transition delay-150`}
        >
          {baseUrl.current + shortUrlId}
        </Snippet>
      </div>
    </main>
  );
}
