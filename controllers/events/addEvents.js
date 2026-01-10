const Event = require('../../models/events') // Adjust path to your model

exports.addEvent = async (req, res) => {
  try {
    // 1. Destructure fields from the request body
    // This ensures we only accept data we expect
    const {
      orgId,
      email,
      day,
      eventName,
      eventDescription,
      posterUrl,
      venue,
      organiser,
      startTime,
      endTime,
      registrationLink,
      firstPrize,
      secondPrize,
      thirdPrize,
      eventType,
    } = req.body

    // 2. Basic Validation (Optional but recommended)
    if (!orgId || !eventName || !day || !venue || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields.' })
    }

    // 3. Create the new Event object
    const newEvent = new Event({
      orgId,
      email,
      day,
      eventName,
      eventDescription,
      posterUrl,
      venue,
      organiser,
      startTime,
      endTime,
      registrationLink,
      firstPrize,
      secondPrize,
      thirdPrize,
      eventType,
      participants: [], // Initialize with empty array
    })

    // 4. Save to Database
    const savedEvent = await newEvent.save()

    // 5. Send Success Response
    res.status(201).json({
      message: 'Event created successfully!',
      event: savedEvent,
    })
  } catch (err) {
    console.error('Error adding event:', err)
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}
