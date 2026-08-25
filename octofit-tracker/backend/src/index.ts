import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js'

export const app = express()
const port = Number(process.env.PORT) || 8000

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/users', async (_request, response, next) => {
  try { response.json(await User.find().sort({ name: 1 })) } catch (error) { next(error) }
})

app.post('/api/users', async (request, response, next) => {
  try { response.status(201).json(await User.create(request.body)) } catch (error) { next(error) }
})

app.get('/api/teams', async (_request, response, next) => {
  try { response.json(await Team.find().populate('members', 'username name')) } catch (error) { next(error) }
})

app.post('/api/teams', async (request, response, next) => {
  try { response.status(201).json(await Team.create(request.body)) } catch (error) { next(error) }
})

app.get('/api/activities', async (request, response, next) => {
  try {
    const userId = typeof request.query.userId === 'string' ? request.query.userId : undefined
    const filter = userId ? { userId } : {}
    response.json(await Activity.find(filter).sort({ completedAt: -1 }).populate('userId', 'username name'))
  } catch (error) { next(error) }
})

app.post('/api/activities', async (request, response, next) => {
  try { response.status(201).json(await Activity.create(request.body)) } catch (error) { next(error) }
})

app.get('/api/leaderboard', async (_request, response, next) => {
  try { response.json(await LeaderboardEntry.find().sort({ points: -1 }).populate('userId', 'username name')) } catch (error) { next(error) }
})

app.get('/api/workouts', async (request, response, next) => {
  try {
    const difficulty = typeof request.query.difficulty === 'string' ? request.query.difficulty : undefined
    const workouts = difficulty
      ? await Workout.find({ difficulty } as Record<string, string>).sort({ name: 1 })
      : await Workout.find().sort({ name: 1 })
    response.json(workouts)
  } catch (error) { next(error) }
})

app.post('/api/workouts', async (request, response, next) => {
  try { response.status(201).json(await Workout.create(request.body)) } catch (error) { next(error) }
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : 'Internal server error'
  response.status(400).json({ error: message })
})

if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
    .then(() => app.listen(port, () => console.log(`OctoFit API listening on port ${port}`)))
    .catch((error) => {
      console.error('Error connecting to octofit_db:', error)
      process.exit(1)
    })
}
