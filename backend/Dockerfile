# docker build . -t meemio_backend
#
# With localhost database (default application.properties):
# docker run --net=host -v /meemio_uploads:/app/uploads meemio_backend

FROM gradle:jdk8 as builder
ENV GRADLE_SRC=/home/gradle/src/
WORKDIR $GRADLE_SRC

# Cache depenencies
COPY --chown=gradle:gradle build.gradle.kts settings.gradle.kts gradlew $GRADLE_SRC
COPY --chown=gradle:gradle gradle $GRADLE_SRC/gradle
RUN gradle build || return 0

# Build
COPY --chown=gradle:gradle . $GRADLE_SRC
RUN gradle build

# Run
FROM openjdk:8
ENV APP_HOME=/app/
WORKDIR $APP_HOME
COPY --from=builder /home/gradle/src/build/libs/*.jar $APP_HOME/meemio.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "meemio.jar"]