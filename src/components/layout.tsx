"use client";

import { ReactNode, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Server, Zap, RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  renderStrategy?: "SSG" | "SSR" | "ISR" | "CSR";
  showPerformance?: boolean;
}

const Layout = ({
  children,
  title,
  renderStrategy,
  showPerformance = false,
}: LayoutProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case "SSG":
        return <Zap className="h-3 w-3" />;
      case "SSR":
        return <Server className="h-3 w-3" />;
      case "ISR":
        return <RefreshCw className="h-3 w-3" />;
      case "CSR":
        return <Home className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case "SSG":
        return "bg-green-500";
      case "SSR":
        return "bg-blue-500";
      case "ISR":
        return "bg-purple-500";
      case "CSR":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <span className="text-primary-foreground text-sm font-bold">
                  NJ
                </span>
              </div>
              <h1 className="text-foreground text-xl font-semibold">
                Next.js Render & Cache Playground
              </h1>
            </Link>

            <div className="flex items-center space-x-3">
              {renderStrategy && (
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  {getStrategyIcon(renderStrategy)}
                  <span>{renderStrategy}</span>
                </Badge>
              )}

              {showPerformance && (
                <div
                  className={`h-2 w-2 rounded-full ${getStrategyColor(renderStrategy || "default")} animate-pulse`}
                  title={`${renderStrategy} rendering active`}
                />
              )}

              {!isHomePage && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        {title && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-foreground mb-2 text-3xl font-bold">
                  {title}
                </h1>
                <div className="bg-primary h-1 w-20 rounded-full"></div>
              </div>
              {renderStrategy && (
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">
                    Render Strategy
                  </p>
                  <Badge
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    {getStrategyIcon(renderStrategy)}
                    <span>{renderStrategy}</span>
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      <footer className="border-border bg-muted mt-16 border-t">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-muted-foreground text-center text-sm">
              Built for educational purposes • Demonstrating Next.js concepts in
              React
            </p>
            {renderStrategy && (
              <div className="text-muted-foreground flex items-center space-x-4 text-xs">
                <span>
                  Current: <strong>{renderStrategy}</strong>
                </span>
                <span>•</span>
                <span>
                  Path: <strong>{pathname}</strong>
                </span>
                {showPerformance && (
                  <>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <div
                        className={`h-1 w-1 rounded-full ${getStrategyColor(renderStrategy)} animate-pulse`}
                      />
                      <span>Performance Mode</span>
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
