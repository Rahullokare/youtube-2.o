const Playlist = require("../models/playlist");

exports.createPlaylist = (req, res) => {
  const playlist = new Playlist({
    user_id: req.auth._id,
    ...req.body,
  });

  playlist.save((err, playlist) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to create playlist",
      });
    }
    res.json({
      name: playlist.name,
    });
  });
};

exports.getPlaylistById = (req, res, next, id) => {
  Playlist.findById(id).exec((err, playlist) => {
    if (err || !playlist) {
      return res.status(400).json({
        error: "Playlist Not Found",
      });
    }
    req.playlist = playlist;
    next();
  });
};

exports.getAllPlaylists = (req, res) => {
  Playlist.find().exec((err, playlists) => {
    if (err) {
      return res.status(400).json({
        err: "Playlists Not Found",
      });
    }
    res.json(playlists);
  });
};

exports.updatePlaylist = (req, res) => {
  Playlist.findByIdAndUpdate(
    { _id: req.playlist._id }, //find user
    { $set: req.body }, //what to update
    { new: true, useFindAndModify: false },
    (err, playlist) => {
      if (err) {
        return res.status(400).json({
          err: "not able to update playlist",
        });
      }
      res.json(playlist);
    }
  );
};

exports.deletePlaylist = (req, res) => {
  Playlist.findByIdAndDelete({ _id: req.playlist._id }, (err, playlist) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to delete User",
      });
    }
  });
};
