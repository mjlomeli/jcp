module ActiveRecord
  ## Monkey Patching the Array from the relations
  class Relation

    def has_any(record: items)
      # Product.has_any({tags: [1,2,3,4]})
      self.where("'#{t}' = any (#{self.to_s})")
    end
  end
end

def validate_range(index, count)
  return index if !index or (0 <= index and index < count)
  return 0 if index < 0
  return count if index >= count
  index
end

def iter_range(start = nil, finish = nil, limit = nil, count = 0)
  start = validate_range(start, count)
  finish = validate_range(finish, count)
  limit = validate_range(limit, count)

  start = start || finish && limit && [finish - limit, 0].max || 0
  finish = finish && [finish, start].max || !limit && count || [start + limit, count].min
  limit = limit && [finish - start, limit].min || finish - start

  { start: start, finish: finish, limit: limit }
end

class ApplicationRecord < ActiveRecord::Base
  # Monkey Patching the ApplicationRecord
  self.abstract_class = true

  def self.custom_query(**kwargs)
    self.range(**kwargs).paginate(**kwargs)
  end

  def self.paginate(page_number: 1, results_per_page: self.count, **kwargs)
    index = (page_number - 1) * results_per_page
    self.offset(index).limit(results_per_page)
  end

  def self.range(start: nil, finish: nil, limit: nil, random: false, **kwargs)
    ranges = iter_range(start, finish, limit, self.count)
    start, finish, limit = ranges.values_at(:start, :finish, :limit)
    if random
      self.order("RANDOM()").limit(limit)
    else
      self.offset(start).limit(finish - start)
    end
  end


  def self.categories
    {"Art & Collectibles"=>53,
     "Painting"=>12,
     "Acrylic"=>7,
     "Home & Living"=>84,
     "Home Decor"=>44,
     "Wall Decor"=>35,
     "Bath & Beauty"=>8,
     "Hair Care"=>2,
     "Hair Styling"=>2,
     "Kitchen & Dining"=>18,
     "Drink & Barware"=>19,
     "Drinkware"=>13,
     "Mugs"=>6,
     "Watercolor"=>4,
     "Clothing"=>5,
     "Hoodies & Sweatshirts"=>2,
     "Unisex Adult Clothing"=>4,
     "Food & Drink"=>9,
     "Snacks"=>2,
     "Electronics & Accessories"=>9,
     "Electronics Cases"=>4,
     "Tablet & E-Reader Cases"=>4,
     "Wreaths & Door Hangers"=>2,
     "Wreaths"=>2,
     "Car Parts & Accessories"=>2,
     "Car Accessories"=>2,
     "Paper & Party Supplies"=>14,
     "Paper"=>14,
     "Books, Movies & Music"=>14,
     "Books"=>12,
     "Blank Books"=>3,
     "Journals & Notebooks"=>3,
     "Craft Supplies & Tools"=>13,
     "Fabric & Notions"=>9,
     "Fabric"=>9,
     "Guides & How Tos"=>6,
     "Critiques & Shop Tutorials"=>5,
     "Book Accessories"=>3,
     "Book Covers"=>3,
     "Photography"=>11,
     "Color"=>11,
     "Essential Oils"=>2,
     "Drawing & Illustration"=>3,
     "Digital"=>3,
     "Toys & Games"=>18,
     "Toys"=>18,
     "Push & Pull Toys"=>7,
     "Animals"=>4,
     "Pretend Play"=>2,
     "Baby & Toddler Toys"=>3,
     "Music & Sound"=>3,
     "Prints"=>4,
     "Digital Prints"=>3,
     "Fiber Arts"=>11,
     "Embroidery"=>4,
     "Macrame"=>7,
     "Tops & Tees"=>3,
     "T-shirts"=>3,
     "Graphic Tees"=>3,
     "Stationery"=>7,
     "Design & Templates"=>7,
     "Templates"=>11,
     "Baked Goods"=>5,
     "Collectibles"=>3,
     "Figurines & Knick Knacks"=>3,
     "Accessories"=>9,
     "Hats & Caps"=>8,
     "Winter Hats"=>8,
     "Shoes"=>10,
     "Unisex Kids' Shoes"=>0,
     "Booties & Crib Shoes"=>3,
     "Jewelry"=>49,
     "Watches"=>11,
     "Wrist Watches"=>11,
     "Dolls & Miniatures"=>4,
     "Art Dolls"=>4,
     "Sculpture"=>5,
     "Figurines"=>5,
     "Candles & Holders"=>5,
     "Candles"=>5,
     "Doll & Model Supplies"=>2,
     "Miniatures"=>2,
     "Bags & Purses"=>5,
     "Handbags"=>4,
     "Shoulder Bags"=>4,
     "Bracelets"=>9,
     "Chain & Link Bracelets"=>3,
     "Earrings"=>19,
     "Dangle & Drop Earrings"=>19,
     "Weddings"=>6,
     "Gifts & Mementos"=>4,
     "Coasters"=>2,
     "Barware"=>4,
     "Martini & Cocktail Glasses"=>2,
     "Martini Glasses"=>2,
     "Office"=>2,
     "Office & School Supplies"=>2,
     "Tumblers & Water Glasses"=>2,
     "Brooches, Pins & Clips"=>2,
     "Brooches"=>2,
     "Outdoor & Gardening"=>5,
     "Planters & Pots"=>5,
     "Indoor Planters"=>5,
     "Pet Supplies"=>4,
     "Wall Hangings"=>13,
     "Music"=>2,
     "Calendars & Planners"=>2,
     "Necklaces"=>7,
     "Pendants"=>5,
     "Storage & Organization"=>3,
     "Baskets"=>3,
     "Lighting"=>2,
     "Lamps"=>2,
     "Table Lamps"=>2,
     "Invitations & Announcements"=>4,
     "Unisex Adult Shoes"=>2,
     "Sneakers & Athletic Shoes"=>2,
     "Mirrors"=>2,
     "Pet Collars & Leashes"=>3,
     "Pet Leashes"=>3,
     "Charm Bracelets"=>4,
     "Beaded Bracelets"=>2,
     "Slip Ons"=>5,
     "Loafers"=>5,
     "Play Tents & Playhouses"=>6,
     "Play Tents"=>6}
    ["Art & Collectibles", "Home & Living", "Home Decor", "Jewelry", "Toys & Games",
     "Kitchen & Dining", "Drink & Barware", "Craft Supplies & Tools", "Books, Movies & Music"]
  end
end