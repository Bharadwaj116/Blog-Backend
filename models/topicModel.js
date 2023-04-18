const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
        selected_topics:{
            type:String,
            required: [true, "Please select atleast one topic"],
            unique: [true, "Seleted topic already taken"],
        },

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Topics",TopicSchema)