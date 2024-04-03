import QuickSave from "../models/QuickSave.mjs";
export const quickSaveCreate = async (req, res) => {
    try {
        const { username, link, tags, description } = req.body;
        // Extract 't' parameter from the link URL
        const urlParams = new URLSearchParams(link.split('?')[1]); // Split by '?' to get query string
        const t = urlParams.get('t'); // Get the value of 't' parameter

        console.log("t", t)

        // Validate and ensure 't' parameter is provided
        if (!t) {
            return res.status(400).json({ success: false, message: 'Parameter "t" is required.' });
        }
        // Extract episode ID from the Spotify link
        // https://open.spotify.com/episode/59v1LmgmajUIAqXITdpz95?si=eJmhriBKSVijNB8220uhCQ&t=1781&context=spotify%3Ashow%3A0dWpNy3iA6Mm3xYaHB2Zi9
        const episodeIdStartIndex = link.indexOf('episode/') + 8;
        // Find the index of 'episode/' and add 8 to get the start index of the episode ID
        let episodeIdEndIndex = link.indexOf('?', episodeIdStartIndex);
        // Find the index of '?' after the start index
        if (episodeIdEndIndex === -1) {
            // If '?' not found, set the end index to the end of the string
            episodeIdEndIndex = link.length;
        }
        const episodeId = link.substring(episodeIdStartIndex, episodeIdEndIndex);
        // Extract the substring between the start and end indices

        console.log("epi", episodeId)
        const embedLink = `https://open.spotify.com/embed/episode/${episodeId}/?t=${t}`;

        // Split tags string into an array
        const tagsArray = tags.split(',').map(tag => tag.trim());
        const quickSave = new QuickSave({
            username,
            link,
            tags: tagsArray,
            description,
            startTime: t,
            embedLink
        });

        await quickSave.save();

        res.status(201).json({ success: true, message: 'Form data saved successfully.', quickSave });

    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}
export const getAllEmbedLinks = async (req, res) => {
    try {
        // Retrieve all documents from the QuickSave collection
        const quickSaves = await QuickSave.find({}, "embedLink");

        // Extract embed links from the retrieved documents
        const embedLinks = quickSaves.map((quickSave) => quickSave.embedLink);

        res.status(200).json({ success: true, embedLinks });
    } catch (error) {
        console.error("Error fetching embed links:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
