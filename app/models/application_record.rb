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
    puts kwargs
    self.range(**kwargs).paginate(**kwargs)
  end

  def self.paginate(page_number: 1, results_per_page: self.count, **kwargs)
    puts "#{page_number}, #{results_per_page}"
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
end