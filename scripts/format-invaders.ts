import fs from 'fs'
import path from 'path'

// Define the type for our invader entries
interface Invader {
  id: string
  coordinates: {
    lat: number
    long: number
  }
}

// Function to round a number to 6 decimal places
function roundTo6Decimals(num: number): number {
  return Number(num.toFixed(6))
}

// Function to slightly offset coordinates
function offsetCoordinates(coordinates: { lat: number; long: number }, index: number): { lat: number; long: number } {
  const { long, lat } = coordinates
  // Offset by a small amount (approximately 10 meters) in different directions
  const offset = 0.0001 // roughly 10 meters
  const angle = (index * Math.PI) / 2 // Different angle for each invader
  return {
    long: roundTo6Decimals(long + offset * Math.cos(angle)),
    lat: roundTo6Decimals(lat + offset * Math.sin(angle)),
  }
}

// Function to extract invader names from a string
function extractInvaderNames(name: string): string[] {
  // Match all occurrences of PA_ or VRS_ (with possible multiple underscores) followed by numbers
  const matches = name.match(/(?:PA_+|VRS_+)\d+/g) || []

  // If no matches found, return the original name
  if (matches.length === 0) {
    return [name]
  }

  // For each match, normalize the invader code to have a single underscore
  return matches.map(invaderCode => invaderCode.replace(/_+/g, '_'))
}

// Read and process the invaders data
const inputPath = path.join(process.cwd(), 'assets', 'invaders.json')
const outputPath = path.join(process.cwd(), 'assets', 'formatted-invaders.json')

try {
  // Read the input file
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'))

  // Process the data
  const formattedData = data.flatMap((entry: any) => {
    const invaders = extractInvaderNames(entry.name)

    // Convert coordinates tuple to object and round to 6 decimals
    const coordinates = {
      long: roundTo6Decimals(entry.coordinates[0]),
      lat: roundTo6Decimals(entry.coordinates[1]),
    }

    // If there's only one invader, return it as is
    if (invaders.length === 1) {
      return [
        {
          id: invaders[0],
          coordinates,
        },
      ]
    }

    // For multiple invaders, create separate entries with offset coordinates
    return invaders.map((id: string, index: number) => ({
      id,
      coordinates: offsetCoordinates(coordinates, index),
    }))
  })

  // Sort by id
  const sortedInvaders = formattedData.sort((a: Invader, b: Invader) => {
    // Extract prefix and number parts
    const aMatch = a.id.match(/^([A-Z]+)_(\d+)$/)
    const bMatch = b.id.match(/^([A-Z]+)_(\d+)$/)

    if (!aMatch || !bMatch) return 0

    const [_, aPrefix, aNum] = aMatch
    const [__, bPrefix, bNum] = bMatch

    // First compare prefixes
    if (aPrefix !== bPrefix) {
      return aPrefix.localeCompare(bPrefix)
    }

    // If prefixes are the same, compare numbers numerically
    return parseInt(aNum) - parseInt(bNum)
  })

  // Write the formatted data to the output file in compact mode
  fs.writeFileSync(outputPath, JSON.stringify(sortedInvaders))

  console.log(`Successfully formatted ${data.length} entries into ${formattedData.length} entries`)
  console.log(`Output written to: ${outputPath}`)
} catch (error) {
  console.error('Error processing the file:', error)
}
