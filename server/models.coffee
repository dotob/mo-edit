module.exports = (mongoose) -> 
	Schema   = mongoose.Schema
	ObjectId = mongoose.Schema.ObjectId

	AuthorSchema = new Schema
		name: String
		role: String

	CommentSchema = new Schema
		author: 
			type: ObjectId
			ref: AuthorSchema
		text: String
		created: Date

	ChapterSchema = new Schema 
		author: 
			type: ObjectId
			ref: AuthorSchema
		title: String
		content: String
		lastChanged: Date
		state: String
		chapters: [ChapterSchema]
		comments: [CommentSchema]
		version: String

	DocumentSchema = new Schema 
		headAuthor:
			type: ObjectId
			ref: AuthorSchema
		title: String
		chapters: [ChapterSchema]
		state: String

	Author = mongoose.model('author', AuthorSchema)
	Comment = mongoose.model('comment', CommentSchema)
	Chapter = mongoose.model('chapter', ChapterSchema)
	Document = mongoose.model('document', DocumentSchema)

	{Author: Author, Comment: Comment, Chapter: Chapter, Document: Document}