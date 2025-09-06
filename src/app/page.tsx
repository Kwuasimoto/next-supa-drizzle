import Layout from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { strategies } from "@/data/mocks";
import { ArrowRight, Clock, Code2, Database } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">
          <Code2 className="mr-2 h-4 w-4" />
          Educational Demo
        </div>
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
          Next.js Rendering & Caching
          <span className="text-muted-foreground"> Playground</span>
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
          Learn how different rendering strategies and caching mechanisms work
          in Next.js through interactive examples and real-time demonstrations.
        </p>
        <div className="text-muted-foreground flex items-center justify-center space-x-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>Built for developers • Interactive learning</span>
        </div>
      </div>

      {/* Rendering Strategies Grid */}
      <div className="mb-16">
        <h2 className="text-foreground mb-2 text-2xl font-semibold">
          Rendering Strategies
        </h2>
        <p className="text-muted-foreground mb-8">
          Explore how each rendering method handles data fetching and
          performance.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {strategies.map((strategy) => {
            const IconComponent = strategy.icon;
            return (
              <Card
                key={strategy.path}
                className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`h-12 w-12 rounded-lg ${strategy.color} mb-4 flex items-center justify-center transition-colors duration-200 group-hover:scale-110`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">{strategy.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{strategy.title}</CardTitle>
                  <CardDescription className="text-base">
                    {strategy.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex h-full flex-col">
                  <ul className="mb-6 space-y-2">
                    {strategy.features.map((feature: string, index: number) => (
                      <li
                        key={index}
                        className="text-muted-foreground flex items-center text-sm"
                      >
                        <div className="bg-primary mr-3 h-1.5 w-1.5 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-auto w-full cursor-pointer transition-all group-hover:gap-3"
                  >
                    <Link href={strategy.path}>
                      Try {strategy.title.split(" ")[0]}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Caching Section */}
      <Card className="border-muted-foreground/20 border-2 border-dashed">
        <CardHeader className="text-center">
          <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
            <Database className="text-muted-foreground h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Caching Strategies</CardTitle>
          <CardDescription className="text-base">
            Understand how different caching mechanisms impact performance and
            data freshness
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6 grid gap-4 text-sm md:grid-cols-3">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="mb-2 font-medium">Browser Cache</h4>
              <p className="text-muted-foreground">
                Client-side caching for static assets
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="mb-2 font-medium">CDN Cache</h4>
              <p className="text-muted-foreground">
                Edge-side caching for global delivery
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="mb-2 font-medium">App Cache</h4>
              <p className="text-muted-foreground">
                Application-level data caching
              </p>
            </div>
          </div>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-secondary hover:bg-primary/10 hover:border-primary cursor-pointer"
          >
            <Link href="/caching">
              Explore Caching Demos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
}
