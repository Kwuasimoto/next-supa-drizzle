import { createPostRepository } from "@/data/repositories/better-posts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  const ttl = parseInt(searchParams.get('ttl') || '0');
  
  console.log(`🔄 [API] GET /api/posts - Request received (TTL: ${ttl}s)`);
  
  try {
    // Initialize repository
    const postRepository = createPostRepository();
    console.log(`📊 [API] Repository initialized`);
    
    // Fetch posts with timing
    const dbStart = Date.now();
    const posts = await postRepository.getAll();
    const dbTime = Date.now() - dbStart;
    
    console.log(`⚡ [API] Database read completed in ${dbTime}ms`);
    console.log(`📋 [API] Retrieved ${posts.length} posts`);
    
    // Calculate total request time
    const totalTime = Date.now() - startTime;
    console.log(`✅ [API] GET /api/posts - Success (${totalTime}ms total)`);
    
    // Set cache headers based on TTL parameter
    const cacheControl = ttl > 0 
      ? `public, max-age=${ttl}, s-maxage=${ttl}` 
      : 'no-cache, no-store, must-revalidate';
    
    console.log(`📋 [API] Cache-Control: ${cacheControl}`);
    
    return NextResponse.json({
      data: posts,
      meta: {
        count: posts.length,
        timestamp: new Date().toISOString(),
        processingTime: totalTime,
        dbTime: dbTime,
        ttl: ttl,
        cacheControl: cacheControl
      }
    }, {
      status: 200,
      headers: {
        'Cache-Control': cacheControl,
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    const totalTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    console.error(`❌ [API] GET /api/posts - Error (${totalTime}ms):`, error);
    
    return NextResponse.json({
      error: 'Failed to fetch posts',
      message: errorMessage,
      timestamp: new Date().toISOString(),
      processingTime: totalTime
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}