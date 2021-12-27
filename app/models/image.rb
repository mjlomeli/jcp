class Image < ApplicationRecord
  def source
    if self.data.nil?
      self.url
    else
      "data:#{self.mimetype};base64,#{self.data}"
    end
  end
end
