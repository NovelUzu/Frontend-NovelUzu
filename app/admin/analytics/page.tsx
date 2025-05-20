"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  Eye,
  ThumbsUp,
  Clock,
  Map,
  Smartphone,
  Laptop,
} from "lucide-react"

// Datos de ejemplo para las gráficas
const mockUserData = [
  { date: "2023-01", total: 120, new: 45, active: 98 },
  { date: "2023-02", total: 145, new: 32, active: 110 },
  { date: "2023-03", total: 165, new: 28, active: 125 },
  { date: "2023-04", total: 190, new: 35, active: 140 },
  { date: "2023-05", total: 210, new: 30, active: 155 },
  { date: "2023-06", total: 235, new: 40, active: 170 },
  { date: "2023-07", total: 260, new: 35, active: 190 },
  { date: "2023-08", total: 290, new: 45, active: 210 },
  { date: "2023-09", total: 320, new: 40, active: 230 },
  { date: "2023-10", total: 350, new: 45, active: 250 },
  { date: "2023-11", total: 380, new: 50, active: 270 },
  { date: "2023-12", total: 420, new: 60, active: 300 },
]

const mockContentData = [
  { date: "2023-01", novels: 45, chapters: 320, comments: 780 },
  { date: "2023-02", novels: 48, chapters: 350, comments: 820 },
  { date: "2023-03", novels: 52, chapters: 380, comments: 900 },
  { date: "2023-04", novels: 55, chapters: 410, comments: 950 },
  { date: "2023-05", novels: 60, chapters: 450, comments: 1050 },
  { date: "2023-06", novels: 65, chapters: 490, comments: 1150 },
  { date: "2023-07", novels: 70, chapters: 530, comments: 1250 },
  { date: "2023-08", novels: 76, chapters: 580, comments: 1380 },
  { date: "2023-09", novels: 82, chapters: 630, comments: 1520 },
  { date: "2023-10", novels: 88, chapters: 680, comments: 1650 },
  { date: "2023-11", novels: 95, chapters: 740, comments: 1780 },
  { date: "2023-12", novels: 102, chapters: 800, comments: 1950 },
]

const mockEngagementData = [
  { date: "2023-01", views: 12500, likes: 2300, comments: 780, readTime: 4500 },
  { date: "2023-02", views: 13200, likes: 2450, comments: 820, readTime: 4800 },
  { date: "2023-03", views: 14500, likes: 2700, comments: 900, readTime: 5200 },
  { date: "2023-04", views: 15800, likes: 2900, comments: 950, readTime: 5600 },
  { date: "2023-05", views: 17200, likes: 3200, comments: 1050, readTime: 6100 },
  { date: "2023-06", views: 18500, likes: 3400, comments: 1150, readTime: 6500 },
  { date: "2023-07", views: 20000, likes: 3700, comments: 1250, readTime: 7000 },
  { date: "2023-08", views: 22000, likes: 4100, comments: 1380, readTime: 7600 },
  { date: "2023-09", views: 24000, likes: 4500, comments: 1520, readTime: 8200 },
  { date: "2023-10", views: 26500, likes: 4900, comments: 1650, readTime: 8900 },
  { date: "2023-11", views: 29000, likes: 5400, comments: 1780, readTime: 9600 },
  { date: "2023-12", views: 32000, likes: 6000, comments: 1950, readTime: 10400 },
]

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("7d")

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Analytics Dashboard</h1>
        <div className="space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last 1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,524</div>
            <p className="text-sm text-gray-500">
              <TrendingUp className="mr-1 h-4 w-4 inline-block" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Views</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,231</div>
            <p className="text-sm text-gray-500">
              <TrendingUp className="mr-1 h-4 w-4 inline-block" />
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8%</div>
            <p className="text-sm text-gray-500">
              <TrendingUp className="mr-1 h-4 w-4 inline-block" />
              +3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Read Time</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4:32</div>
            <p className="text-sm text-gray-500">
              <TrendingUp className="mr-1 h-4 w-4 inline-block" />
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
          <TabsTrigger value="platforms">Platform Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Overview of user activity over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={mockUserData}
                index="date"
                categories={["total", "new", "active"]}
                colors={["#3182ce", "#276749", "#d69e2e"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Insights into content performance metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={mockContentData}
                index="date"
                categories={["novels", "chapters", "comments"]}
                colors={["#e53e3e", "#dd6b20", "#38a169"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Analyze user engagement with your content.</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={mockEngagementData}
                index="date"
                categories={["views", "likes", "comments", "readTime"]}
                colors={["#4299e1", "#9f7aea", "#48bb78", "#f6ad55"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="platforms">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
              <CardDescription>Understand where your users are accessing your content.</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={[
                  { label: "Desktop", value: 60, icon: <Laptop className="h-4 w-4" /> },
                  { label: "Mobile", value: 30, icon: <Smartphone className="h-4 w-4" /> },
                  { label: "Tablet", value: 10, icon: <Map className="h-4 w-4" /> },
                ]}
                colors={["#ed8936", "#48bb78", "#4299e1"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
            <CardDescription>User demographics and location data.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for demographics data */}
            <p>Demographics data will be displayed here.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Popularity</CardTitle>
            <CardDescription>Most popular content based on views and engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for content popularity data */}
            <p>Content popularity data will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
