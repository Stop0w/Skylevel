import { getCandidatesForFitQueue } from '../../../lib/database-utils'
import { FitQueueClient } from './FitQueueClient'

export default async function FitQueuePage() {
  const startTime = performance.now()

  const candidates = await getCandidatesForFitQueue()
  const endTime = performance.now()
  console.log(`Fit Queue server render in ${(endTime - startTime).toFixed(2)}ms`)

  return <FitQueueClient initialCandidates={candidates} />
}