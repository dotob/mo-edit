module.exports = (mongoose) -> 
	Schema   = mongoose.Schema
	ObjectId = mongoose.Schema.ObjectId

	AuthorSchema = new Schema
		name: String
		role: String

	ChapterSchema = new Schema 
		author: 
			type: Schema.ObjectId
			ref: AuthorSchema
		title: String
		content: String
		lastChanged: Date
		state: String

	DocumentSchema = new Schema 
		headAuthor:
			type: Schema.ObjectId
			ref: AuthorSchema
		title: String
		chapters: [ChapterSchema]
		state: String

	Author = module.exports.Author = mongoose.model('author', AuthorSchema)
	Chapter = module.exports.Chapter = mongoose.model('chapter', ChapterSchema)
	Document = module.exports.Document = mongoose.model('document', DocumentSchema)

	return {Author: Author, Chapter: Chapter, Document: Document}