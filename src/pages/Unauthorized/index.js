import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1); // create a button to go back
  return <div>Unauthorized</div>;
}
