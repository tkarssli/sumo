```js
{ 
    user: {
        handle: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        leagues: [id1, id2, id3]
    },
    
    wrestler: {
        webId: {
            type: Number,
            required: true
        },
        name: {
            type: String
            required: true
        },
        stable: {
            type: String
        },
        ringName: {
            type: String
        },
        rank: {
            type: String 
        },
        dob: {
            type: Date
        },
        pob: {
            type: String
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        image: {
            data: String, 
            contentType: String
        }
    },

    tournament: {
        month: {
            type: Number
            required: true
        },
        wrestlers: [
            {wrestlerId: id1, score: 13},
            {wrestlerId: id2, score: 20},
            {wrestlerId: id3, score: 1}
        ],
        days:[
            {day: 1, fights: [{
                {wrestlers: [id1, id2], east: id1, west: id2, winner: id1}
            }]}
        ]
    },

    league: {
        players: [
            {playerId: ObjectId, wrestlers: [id1, id2, id3], owner: Boolean}
        ]
    }
}
```