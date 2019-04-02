json.array! @untreated do |message|
  json.user         message.user.name
  json.content      message.content
  json.image        message.image.url
  json.created_at   message.created_at
end
