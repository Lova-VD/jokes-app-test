import mongoose from 'mongoose';

interface JokeAttrs {
  title: string;
}

interface JokeDoc extends mongoose.Document {
  title: string;
}

interface JokeModel extends mongoose.Model<JokeDoc> {
  build(attrs: JokeAttrs): JokeDoc;
}

const JokeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

JokeSchema.statics.build = (attrs: JokeAttrs) => {
  return new Joke(attrs);
};

const Joke = mongoose.model<JokeDoc, JokeModel>('Joke', JokeSchema);

export { Joke };
