import { useState, useEffect } from "react";

// Hook'un tipi tanımlamaları
interface UseDateRangeProps {
  day: number;
}

interface UseDateRangeReturn {
  startDate: number;
  endDate: number;
  formattedStartDate: string;
  formattedEndDate: string;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Tarayıcının yerel ayarlarına göre tarih ve saat biçimi
};

const useDateRange = ({ day }: UseDateRangeProps): UseDateRangeReturn => {
  //States
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);
  const [formattedStartDate, setFormattedStartDate] = useState<string>("");
  const [formattedEndDate, setFormattedEndDate] = useState<string>("");
  //Effects
  useEffect(() => {
    const currentEndDate = new Date();

    const calculatedStartDate = new Date(currentEndDate);
    calculatedStartDate.setDate(currentEndDate.getDate() - day);

    const currentEndDateUnix = Math.floor(currentEndDate.getTime() / 1000);
    const calculatedStartDateUnix = Math.floor(
      calculatedStartDate.getTime() / 1000
    );

    setEndDate(currentEndDateUnix);
    setStartDate(calculatedStartDateUnix);
    setFormattedEndDate(formatDate(currentEndDateUnix));
    setFormattedStartDate(formatDate(calculatedStartDateUnix));
  }, [day]);

  return {
    startDate,
    endDate,
    formattedStartDate,
    formattedEndDate,
  };
};

export default useDateRange;
