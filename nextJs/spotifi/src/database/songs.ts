// file: database/songs.ts
import { SortDirection } from "mongodb";
import { Song, SortField, User } from "./types"
import { getDb } from "./client";

export const PAGE_SIZE = 10;

async function getSongsCollection() {
    const db = await getDb();
    return db.collection<Song>("songs");
}

async function getUsersCollection() {
    const db = await getDb();
    return db.collection<User>("users");
}

const MOCK_SONGS: Song[] = [
    {
        id: 1,
        title: "Bohemian Rhapsody",
        description: "A classic by Queen",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png",
        credits: 10,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        more_information: { publish_date: "1975-10-31", genre: "Rock", type: "Single" }
    },
    {
        id: 2,
        title: "Imagine",
        description: "John Lennon's masterpiece",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/69/ImagineCover.jpg",
        credits: 8,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        more_information: { publish_date: "1971-10-11", genre: "Rock", type: "Single" }
    },
    {
        id: 3,
        title: "Hotel California",
        description: "Eagles hit song",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg",
        credits: 12,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        more_information: { publish_date: "1977-02-22", genre: "Rock", type: "Single" }
    },
    {
        id: 4,
        title: "Billie Jean",
        description: "Michael Jackson's iconic track",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Billie_Jean.jpg",
        credits: 15,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        more_information: { publish_date: "1983-01-02", genre: "Pop", type: "Single" }
    },
    {
        id: 5,
        title: "Smells Like Teen Spirit",
        description: "Nirvana's grunge anthem",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3c/Smells_Like_Teen_Spirit.jpg",
        credits: 11,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        more_information: { publish_date: "1991-09-10", genre: "Grunge", type: "Single" }
    },
    {
        id: 6,
        title: "Sweet Child O' Mine",
        description: "Guns N' Roses classic",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/15/Guns_N%27_Roses_-_Sweet_Child_o%27_Mine.png",
        credits: 9,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        more_information: { publish_date: "1988-08-17", genre: "Rock", type: "Single" }
    },
    {
        id: 7,
        title: "Like a Rolling Stone",
        description: "Bob Dylan's folk rock hit",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/1f/Bob_Dylan_-_Like_a_Rolling_Stone.png",
        credits: 7,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        more_information: { publish_date: "1965-07-20", genre: "Folk Rock", type: "Single" }
    },
    {
        id: 8,
        title: "Hey Jude",
        description: "The Beatles' uplifting ballad",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/0a/Heyjude.jpg",
        credits: 10,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        more_information: { publish_date: "1968-08-26", genre: "Rock", type: "Single" }
    },
    {
        id: 9,
        title: "Purple Haze",
        description: "Jimi Hendrix's psychedelic rock",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/f/f9/Purple_Haze_%28Jimi_Hendrix_song_-_cover_art%29.jpg",
        credits: 8,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        more_information: { publish_date: "1967-03-17", genre: "Psychedelic Rock", type: "Single" }
    },
    {
        id: 10,
        title: "Yesterday",
        description: "The Beatles' melancholic classic",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/e7/Help%21_%28The_Beatles_album_-_cover_art%29.jpg",
        credits: 6,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        more_information: { publish_date: "1965-09-13", genre: "Pop", type: "Single" }
    },
    {
        id: 11,
        title: "Wonderwall",
        description: "Oasis's Britpop anthem",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/17/Wonderwall_cover.jpg",
        credits: 9,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        more_information: { publish_date: "1995-10-30", genre: "Britpop", type: "Single" }
    },
    {
        id: 12,
        title: "Lose Yourself",
        description: "Eminem's powerful rap track",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/93/Eminem_-_Lose_Yourself_CD_cover.jpg",
        credits: 13,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        more_information: { publish_date: "2002-10-28", genre: "Hip Hop", type: "Single" }
    },
    {
        id: 13,
        title: "Stairway to Heaven",
        description: "Led Zeppelin's epic",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg",
        credits: 14,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        more_information: { publish_date: "1971-11-08", genre: "Rock", type: "Single" }
    },
    {
        id: 14,
        title: "Respect",
        description: "Aretha Franklin's soul hit",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a7/Respect_Aretha_Franklin.jpg",
        credits: 8,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        more_information: { publish_date: "1967-04-29", genre: "Soul", type: "Single" }
    },
    {
        id: 15,
        title: "Good Vibrations",
        description: "The Beach Boys' masterpiece",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/e8/Good_Vibrations_US_cover.jpg",
        credits: 9,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        more_information: { publish_date: "1966-10-10", genre: "Pop", type: "Single" }
    },
    {
        id: 16,
        title: "Johnny B. Goode",
        description: "Chuck Berry's rock and roll staple",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/96/Chuck_Berry_-_Johnny_B._Goode.jpg",
        credits: 7,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        more_information: { publish_date: "1958-03-31", genre: "Rock and Roll", type: "Single" }
    },
    {
        id: 17,
        title: "I Will Always Love You",
        description: "Whitney Houston's powerful ballad",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/60/I_Will_Always_Love_You_by_Whitney_Houston_US_CD_single.jpg",
        credits: 11,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        more_information: { publish_date: "1992-11-03", genre: "R&B", type: "Single" }
    },
    {
        id: 18,
        title: "No Woman, No Cry",
        description: "Bob Marley's reggae classic",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c2/BobMarley-NoWomanNoCry.jpg",
        credits: 8,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        more_information: { publish_date: "1974-10-25", genre: "Reggae", type: "Single" }
    },
    {
        id: 19,
        title: "Hallelujah",
        description: "Leonard Cohen's spiritual song",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a0/Leonard_Cohen_-_Hallelujah.png",
        credits: 9,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        more_information: { publish_date: "1984-12-01", genre: "Folk", type: "Single" }
    },
    {
        id: 20,
        title: "Thriller",
        description: "Michael Jackson's spooky hit",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
        credits: 15,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        more_information: { publish_date: "1984-01-23", genre: "Pop", type: "Single" }
    },
    {
        id: 21,
        title: "Rolling in the Deep",
        description: "Adele's powerful soul-pop",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.jpg",
        credits: 12,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        more_information: { publish_date: "2010-11-29", genre: "Soul", type: "Single" }
    },
    {
        id: 22,
        title: "Uptown Funk",
        description: "Mark Ronson ft. Bruno Mars",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a7/Mark_Ronson_-_Uptown_Funk_%28feat._Bruno_Mars%29_%28Official_Single_Cover%29.png",
        credits: 14,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        more_information: { publish_date: "2014-11-10", genre: "Funk", type: "Single" }
    },
    {
        id: 23,
        title: "Shape of You",
        description: "Ed Sheeran's catchy pop hit",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29.jpg",
        credits: 13,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        more_information: { publish_date: "2017-01-06", genre: "Pop", type: "Single" }
    },
    {
        id: 24,
        title: "Blinding Lights",
        description: "The Weeknd's synth-pop smash",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
        credits: 15,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        more_information: { publish_date: "2019-11-29", genre: "Synth-pop", type: "Single" }
    },
    {
        id: 25,
        title: "Bad Guy",
        description: "Billie Eilish's dark pop",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/33/Billie_Eilish_-_Bad_Guy.png",
        credits: 11,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        more_information: { publish_date: "2019-03-29", genre: "Pop", type: "Single" }
    },
    {
        id: 26,
        title: "Old Town Road",
        description: "Lil Nas X's country rap",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/7/74/Lil_Nas_X_-_Old_Town_Road.png",
        credits: 10,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        more_information: { publish_date: "2018-12-03", genre: "Country Rap", type: "Single" }
    },
    {
        id: 27,
        title: "Someone Like You",
        description: "Adele's emotional ballad",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/7/7a/Adele_-_Someone_Like_You.png",
        credits: 12,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        more_information: { publish_date: "2011-01-24", genre: "Soul", type: "Single" }
    },
    {
        id: 28,
        title: "Thinking Out Loud",
        description: "Ed Sheeran's romantic song",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/ad/X_cover.png",
        credits: 11,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        more_information: { publish_date: "2014-09-24", genre: "Pop", type: "Single" }
    },
    {
        id: 29,
        title: "Despacito",
        description: "Luis Fonsi ft. Daddy Yankee",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c8/Luis_Fonsi_Feat._Daddy_Yankee_-_Despacito_%28Official_Single_Cover%29.png",
        credits: 14,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        more_information: { publish_date: "2017-01-12", genre: "Reggaeton", type: "Single" }
    },
    {
        id: 30,
        title: "Closer",
        description: "The Chainsmokers ft. Halsey",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29.png",
        credits: 13,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        more_information: { publish_date: "2016-07-29", genre: "EDM", type: "Single" }
    },
    {
        id: 31,
        title: "Love Story",
        description: "Taylor Swift's country pop",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/01/Taylor_Swift_-_Love_Story.png",
        credits: 10,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        more_information: { publish_date: "2008-09-12", genre: "Country Pop", type: "Single" }
    },
    {
        id: 32,
        title: "Viva La Vida",
        description: "Coldplay's orchestral rock",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/80/Coldplay_-_Viva_la_Vida.jpg",
        credits: 11,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        more_information: { publish_date: "2008-05-25", genre: "Baroque Pop", type: "Single" }
    },
    {
        id: 33,
        title: "Mr. Brightside",
        description: "The Killers' indie rock anthem",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3f/The_Killers_-_Mr._Brightside.jpg",
        credits: 9,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        more_information: { publish_date: "2003-09-29", genre: "Indie Rock", type: "Single" }
    },
    {
        id: 34,
        title: "Seven Nation Army",
        description: "The White Stripes' garage rock",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/ce/The_White_Stripes_-_Seven_Nation_Army.jpg",
        credits: 10,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        more_information: { publish_date: "2003-03-07", genre: "Garage Rock", type: "Single" }
    },
    {
        id: 35,
        title: "Crazy in Love",
        description: "Beyoncé ft. Jay-Z",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/84/Crazy_in_love_cover.jpg",
        credits: 12,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        more_information: { publish_date: "2003-05-18", genre: "R&B", type: "Single" }
    },
    {
        id: 36,
        title: "Hey Ya!",
        description: "OutKast's energetic hit",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a0/OutKast_-_Hey_Ya%21_CD_cover.jpg",
        credits: 11,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        more_information: { publish_date: "2003-08-25", genre: "Hip Hop", type: "Single" }
    },
    {
        id: 37,
        title: "In the End",
        description: "Linkin Park's nu-metal classic",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/64/Linkin_Park_-_In_the_End_cover.jpg",
        credits: 10,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        more_information: { publish_date: "2001-10-09", genre: "Nu Metal", type: "Single" }
    },
    {
        id: 38,
        title: "Numb",
        description: "Linkin Park's emotional rock",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/b/b9/Linkin_Park_-_Numb_CD_cover.jpg",
        credits: 10,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        more_information: { publish_date: "2003-09-08", genre: "Alternative Rock", type: "Single" }
    },
    {
        id: 39,
        title: "Fix You",
        description: "Coldplay's touching ballad",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/6c/Coldplay_-_Fix_You.jpg",
        credits: 11,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        more_information: { publish_date: "2005-06-06", genre: "Alternative Rock", type: "Single" }
    },
    {
        id: 40,
        title: "Chandelier",
        description: "Sia's vocal powerhouse",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/45/Sia_-_Chandelier_Single_Cover.png",
        credits: 13,
        mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        more_information: { publish_date: "2014-03-17", genre: "Electropop", type: "Single" }
    }
];

export const seedSongs = async () => {
    const songsCollection = await getSongsCollection();
    // Using mock data since the API is down
    let songs: Song[] = MOCK_SONGS;
    
    await songsCollection.deleteMany({});
    if (await songsCollection.countDocuments() === 0) {
        await songsCollection.insertMany(songs);
        console.log("Seeded songs collection with mock data");
    }
    console.log("Songs collection seeded!");
}

export const getSongs = async (
    userId: number | null,
    q: string,
    sortField: SortField,
    sortDirection: SortDirection,
    page: number = 1
) => {
    const songsCollection = await getSongsCollection();
    const pipeline: any[] = [];

    if (q) {
        const regex = new RegExp(q, 'i');
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } },
                ],
            },
        });
    }

    if (userId != null) {
        pipeline.push(
            {
                $lookup: {
                    from: 'users',
                    let: { songId: '$id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$id', userId] } } },
                        { $project: { _id: 0, library: 1 } },
                    ],
                    as: 'user_ctx',
                },
            },
            { $addFields: { owned: { $in: ['$id', { $ifNull: [{ $arrayElemAt: ['$user_ctx.library', 0] }, []] }] } } },
            { $project: { user_ctx: 0 } }
        );
    }

    if (sortField === 'publish_date') {
        pipeline.push({ $sort: { 'more_information.publish_date': sortDirection === 'asc' ? 1 : -1 } });
    } else if (sortField === 'title') {
        pipeline.push({ $sort: { title: sortDirection === 'asc' ? 1 : -1 } });
    } else if (sortField === 'owned' && userId != null) {
        pipeline.push({ $sort: { owned: sortDirection === 'asc' ? 1 : -1 } });
    }

    pipeline.push({
        $facet: {
            data: [
                { $skip: (page - 1) * PAGE_SIZE },
                { $limit: PAGE_SIZE }
            ],
            totalCount: [
                { $count: 'count' }
            ]
        }
    });

    const [result] = await songsCollection.aggregate(pipeline).toArray();

    const songs = result.data;
    const total = result.totalCount[0] ? result.totalCount[0].count : 0;

    return {
        songs: makeLean<Song[]>(songs),
        pages: Math.ceil(total / PAGE_SIZE)
    };
}

export const getSongById = async (songId: number, userId: number | null = null): Promise<Song | null> => {
    const songsCollection = await getSongsCollection();
    const pipeline: any[] = [
        { $match: { id: songId } }
    ];

    if (userId != null) {
        pipeline.push(
            {
                $lookup: {
                    from: 'users',
                    let: { songId: '$id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$id', userId] } } },
                        { $project: { _id: 0, library: 1 } },
                    ],
                    as: 'user_ctx',
                },
            },
            { $addFields: { owned: { $in: ['$id', { $ifNull: [{ $arrayElemAt: ['$user_ctx.library', 0] }, []] }] } } },
            { $project: { user_ctx: 0 } }
        );
    }

    const [song] = await songsCollection.aggregate<Song>(pipeline).toArray();
    return song ? makeLean<Song>(song) : null;
}

const makeLean = <T,>(obj: any): T => {
    return JSON.parse(JSON.stringify(obj)) as T;
}

export const addCoinsToUser = async (userId: number, coins: number): Promise<void> => {
    const usersCollection = await getUsersCollection();
    await usersCollection.updateOne({ id: userId }, { $inc: { credits: coins } });
}

export const getUserLibrary = async (userId: number): Promise<Song[]> => {
    const usersCollection = await getUsersCollection();
    const songsCollection = await getSongsCollection();
    
    const user = await usersCollection.findOne({ id: userId });
    if (!user || !user.library || user.library.length === 0) {
        return [];
    }

    const songs = await songsCollection.find({ id: { $in: user.library } }).toArray();
    // Mark all as owned since they are in the library
    return makeLean<Song[]>(songs.map(s => ({ ...s, owned: true })));
}

export const purchaseSong = async (userId: number, songId: number): Promise<{ success: boolean; message: string }> => {
    const usersCollection = await getUsersCollection();
    const songsCollection = await getSongsCollection();

    const user = await usersCollection.findOne({ id: userId });
    if (!user) {
        return { success: false, message: "User not found" };
    }

    const song = await songsCollection.findOne({ id: songId });
    if (!song) {
        return { success: false, message: "Song not found" };
    }

    if (user.library && user.library.includes(songId)) {
        return { success: false, message: "You already own this song" };
    }

    if (user.credits < song.credits) {
        return { success: false, message: "Insufficient credits" };
    }

    // Perform transaction (without actual MongoDB transaction for simplicity, but order matters)
    // 1. Deduct credits and add to library
    const result = await usersCollection.updateOne(
        { id: userId, credits: { $gte: song.credits } }, // Double check credits in query for safety
        { 
            $inc: { credits: -song.credits },
            $push: { library: songId }
        }
    );

    if (result.modifiedCount === 0) {
        return { success: false, message: "Transaction failed (Insufficient credits or concurrent update)" };
    }

    return { success: true, message: "Song purchased successfully!" };
}