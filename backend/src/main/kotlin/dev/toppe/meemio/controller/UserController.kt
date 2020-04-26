package dev.toppe.meemio.controller

import dev.toppe.meemio.exception.NotFoundException
import dev.toppe.meemio.model.Media
import dev.toppe.meemio.model.UploadType
import dev.toppe.meemio.service.MediaService
import dev.toppe.meemio.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletResponse


// see UserRepository path: "/users"
@RestController
@RequestMapping(path = ["/user"])
class UserController(
        val userService: UserService,
        val mediaService: MediaService
) {

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = ["/register"])
    fun register(@RequestBody body: CredentialsBody) = userService.createAccount(body.username, body.password)

    /**
     * Just returns the user, use Basic Authentication to login
     */
    @RequestMapping(method = [RequestMethod.GET, RequestMethod.POST], path = ["/login"])
    fun login(response: HttpServletResponse) {
        val userId = userService.getSelf().orElseThrow { NotFoundException("user not found") }.id
        // temp fix: redirect to the Spring Data REST endpoint to avoid infinite recursion
        response.sendRedirect("../users/$userId")
    }

    @PostMapping(path = ["/{userId}/follow"])
    fun followUser(@PathVariable userId: Long) = userService.follow(userId)

    @PostMapping(path = ["/{userId}/unfollow"])
    fun unfollowUser(@PathVariable userId: Long) = userService.unfollow(userId)

    @PostMapping(path = ["/avatar"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun setAvatar(@RequestPart file: MultipartFile): Media? {
        if (file.contentType?.let { it.startsWith("image/") || it.startsWith("video/") } == true) {
            val media = mediaService.store(file.bytes, UploadType.AVATAR)
            userService.setAvatar(media)
            return media
        }
        return null
    }

    // TODO: update user?

    data class CredentialsBody(val username: String, val password: String)
}