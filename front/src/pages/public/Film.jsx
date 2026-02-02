import React from "react";
import { useParams } from "react-router";

export default function Film() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-black">Film #{id}</h1>
      <p className="mt-4 text-white/70">Film page</p>
    </div>
  );
}
