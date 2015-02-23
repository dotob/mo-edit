module.exports = (mongoose) -> 
	Schema   = mongoose.Schema
	ObjectId = mongoose.Schema.ObjectId

	CommentSchema = new Schema
		author: String
		text: String
		created: Date

	ChapterSchema = new Schema 
		author: String
		number: String
		title: String
		content: String
		lastChanged: Date
		state: String
		chapters: [ChapterSchema]
		comments: [CommentSchema]
		version: String

	DocumentSchema = new Schema 
		key: String
		title: String
		headAuthor: String
		patient: {name: String, dob: Date}
		chapters: [ChapterSchema]
		state: String

	Comment = mongoose.model('comment', CommentSchema)
	Chapter = mongoose.model('chapter', ChapterSchema)
	Document = mongoose.model('document', DocumentSchema)

	{Comment: Comment, Chapter: Chapter, Document: Document}