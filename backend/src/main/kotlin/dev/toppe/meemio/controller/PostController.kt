package dev.toppe.meemio.controller

import dev.toppe.meemio.NotFoundException
import dev.toppe.meemio.model.Post
import dev.toppe.meemio.model.UploadType
import dev.toppe.meemio.repository.PostRepository
import dev.toppe.meemio.service.MediaService
import dev.toppe.meemio.service.PostService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping(path = ["/post"])
class PostController(
        val postService: PostService,
        val postRepository: PostRepository,
        val mediaService: MediaService
) {

    data class PostResponse(val postIds: List<Long>)

    @PostMapping(path = ["/upload"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadPost(@RequestPart files: Array<MultipartFile>): Any {
        val postIds = mutableListOf<Long>()
        files.filter { multipartFile ->
            multipartFile.contentType?.let { it.startsWith("image/") || it.startsWith("video/") } ?: false
        }.forEach {
            val media = mediaService.store(it.bytes, UploadType.POST)
            postIds.add(postService.createPost(media).id)
        }
        return PostResponse(postIds)
    }

    @GetMapping(path = ["/{postId}"])
    fun getPost(@PathVariable postId: Long): Post? {
        return postRepository.findById(postId).orElseThrow { NotFoundException("$postId not found") }
    }

    // TODO: delete post
    // update posts? maybe

    @PostMapping(path = ["/{postId}/like"])
    fun likePost(@PathVariable postId: Long) {
        postRepository.findById(postId).orElseThrow { NotFoundException("$postId not found") }.let {
            postService.likePost(it)
        }
    }

    @PostMapping(path = ["/{postId}/dislike"])
    fun dislikePost(@PathVariable postId: Long) {
        postRepository.findById(postId).orElseThrow { NotFoundException("$postId not found") }.let {
            postService.dislikePost(it)
        }
    }

    @GetMapping(path = ["/next"])
    fun nextPosts(@RequestParam limit: Int?) = postService.nextPosts(limit ?: 5)

}