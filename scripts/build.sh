#!/bin/bash

# Ensure Prisma client is generated
echo "Generating Prisma client..."
npx prisma generate

# Build the application
echo "Building Next.js application..."
npm run build 