import React, { useEffect, useState } from "react";
import Chart, { Props } from "react-apexcharts";
import { account } from "@/config/appwrite";
import { useRouter } from "next/navigation";

interface EmotionData {
  date: string;
  emotions: string[];
}

export const Steam = () => {
  const [chartData, setChartData] = useState<Props["series"]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getAccount = async () => {
      try {
        const accountData = await account.get();
        setUser(accountData as any);
      } catch (error) {
        //console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAccount();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    } else if (!loading && user) {
      fetchEmotionData((user as { email: string }).email);
    }
  }, [loading, user, router]);

  const fetchEmotionData = async (email: string) => {
    try {
      const response = await fetch("/api/emotions_by_date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data: EmotionData[] = await response.json();
      processChartData(data);
    } catch (error) {
      console.error("Error fetching emotion data:", error);
    }
  };

  const processChartData = (data: EmotionData[]) => {
    const emotionCounts: { [key: string]: number[] } = {};
    const dates: string[] = [];

    data.forEach(({ date, emotions }) => {
      dates.push(date);
      const counts: { [key: string]: number } = {};
      emotions.forEach((emotion) => {
        counts[emotion] = (counts[emotion] || 0) + 1;
      });

      Object.keys(counts).forEach((emotion) => {
        if (!emotionCounts[emotion])
          emotionCounts[emotion] = Array(dates.length - 1).fill(0);
        emotionCounts[emotion].push(counts[emotion]);
      });
    });

    const series = Object.entries(emotionCounts).map(([name, data]) => ({
      name,
      data,
    }));

    if (dates.length <= 1) {
      setIsDataAvailable(false);
    } else {
      setChartData(series);
      setCategories(dates);
      setIsDataAvailable(true);
    }
  };

  const options: Props["options"] = {
    chart: {
      type: "area",
      animations: {
        easing: "linear",
        speed: 300,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: "basic-bar",
      foreColor: "hsl(var(--nextui-default-800))",
      stacked: true,
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: categories,
      labels: {
        // show: false,
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
      axisBorder: {
        color: "hsl(var(--nextui-nextui-default-200))",
      },
      axisTicks: {
        color: "hsl(var(--nextui-nextui-default-200))",
      },
    },
    yaxis: {
      labels: {
        style: {
          // hsl(var(--nextui-content1-foreground))
          colors: "hsl(var(--nextui-default-800))",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "hsl(var(--nextui-default-200))",
      strokeDashArray: 0,
      position: "back",
    },
    stroke: {
      curve: "smooth",
      fill: {
        colors: ["red"],
      },
    },
    // @ts-ignore
    markers: false,
  };

  return (
    <div className="w-full z-20">
      <div id="chart">
        {loading ? (
          <div className="flex items-center justify-center h-[425px] text-lg text-gray-600">
            Loading...
          </div>
        ) : isDataAvailable ? (
          <Chart
            options={options}
            series={chartData}
            type="area"
            height={425}
          />
        ) : (
          <div className="flex items-center justify-center h-[425px] text-lg text-gray-600">
            You will see graphs tomorrow as more data becomes available.
          </div>
        )}
      </div>
    </div>
  );
};
