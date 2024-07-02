"use client";
// pages/cards/[id].tsx
import { useParams } from "next/navigation";
import React from "react";

const CardDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Card Detail</h1>
      <p>Card ID: {id}</p>
      {/* Render more details about the card here */}
    </div>
  );
};

export default CardDetail;
