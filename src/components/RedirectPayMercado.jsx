import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const Redirect = () => {
  const navigate = useNavigate();

  let location = useLocation().search;
  let initialPosition = location.search("=");
  let finalPosition = location.search("&");
  let collection_id = location.substring(initialPosition + 1, finalPosition);
  console.log(`/confirmation/${collection_id}`);
  useEffect(()=>{

      navigate(`/confirmation/${collection_id}`);
  })
};
