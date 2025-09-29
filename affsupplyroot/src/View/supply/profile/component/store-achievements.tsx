"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Achievement {
  icon: string
  title: string
  description: string
  date: string
}

interface StoreAchievementsProps {
  achievements: Achievement[]
}

export function StoreAchievements({ achievements }: StoreAchievementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thành tích nổi bật</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(achievement.date).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
