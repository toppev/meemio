package dev.toppe.meemio.controller

import dev.toppe.meemio.service.MediaService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping(path = ["/media"])
class MediaController(
        val mediaService: MediaService
) {

    @GetMapping(path = ["/{mediaId}"], produces = [MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE])
    fun getMedia(@PathVariable mediaId: Long) = mediaService.readFile(mediaId)

}