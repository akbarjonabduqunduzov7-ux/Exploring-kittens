# Sound design revision

Reference: newly supplied Apple-widget video. Automatic tempo120.19BPM; median beat spacing.4992s. The mixed source contains both music and effects; individual source stems are unavailable, so no exact effect identification is claimed.

Compared two new catalog tracks: Tech House vibes123.05BPM and Cat Walk129.20BPM. Selected Tech House vibes for its catalogued relaxed electronica/bass/drum character, closer tempo and beat-aligned excerpt. Source20.2478s gives relative beats3.4366s and10.8205s near the first and third transition travel peaks; other events use subdivisions. Catalog and signal measurements support this choice; no subjective listening claim.

Each transition has its own short movement cue and a distinct landing/face cue. Source silences are trimmed, RMS attack peaks measured at1ms steps, and clips placed so peaks follow visual anchors by one output frame. No synthetic placeholder SFX retained. The earbud exit uses left-biased movement; the ear match has a smaller pop. Final contraction combines vacuum, face snap and restrained bass landing. The music dips about3dB briefly around the largest cues and returns, so the rhythm stays continuous.

Raw stock assets remain local and ignored by Git. Native clips retain independent gains, timeline IDs and fade controls. Video artwork/animation unchanged fromv3.

## Export verification

Final video:20seconds,1080×1080,60fps,1200frames. Existing v3 picture stream copied without re-encoding; whole decoded-video SHA256 matches v3. New audio is the native HyperFrames mix. Measured integrated loudness-17.7LUFS, true peak-3.9dBTP, no clipped samples, near-zero tail. All16 stock SFX verified in the actual AAC export, with maximum placement error0.354ms. Correlation timing verification subtracts the known music envelope and overlapping SFX; it does not generate or replace the delivered mix.

Native check reported one silent-clip warning for listener-travel.wav. Independent file analysis found-9.5LUFS and no silent region; the actual exported clip matches its source waveform at the intended gain, confirming this warning is a false positive. No runtime/layout errors.
