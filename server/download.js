import ytdl from "ytdl-core"
import fs from "fs"
import { error } from "console"

export const download = async (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do video:" + videoId)

  try {
    const info = await ytdl.getInfo(videoURL)
    const seconds = info.videoDetails.lengthSeconds

    if (seconds > 60) {
      console.log(
        "A duração desse video é maior do que 60 segundos. Download não permitido."
      )
      return
    }

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("end", () => {
        console.log("Download concluído com sucesso")
      })
      .on("error", (error) => {
        console.log(
          "Não foi possivel concluir o download do video. Detalhes do erro:",
          error
        )
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  } catch (error) {
    console.log("Erro ao obter informações do vídeo. Detalhes do erro:", error)
  }
}
