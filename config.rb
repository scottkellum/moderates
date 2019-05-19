# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :livereload

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

class Question < OpenStruct; end
class Option < OpenStruct; end

helpers do
  def questions
    [
      Question.new(name: "What's your age range?", key: "age", options: [
        Option.new(name: "Under 25", value: "1,0,0"),
        Option.new(name: "Between 25 and 55", value: "0,1,0"),
        Option.new(name: "Older than 55", value: "0,0,1")
      ]),
      Question.new(name: "What do you have most of?", key: "week", options: [
        Option.new(name: "Networks: I have a lot of friends, and I know how to connect them.", value: "2,0,0"),
        Option.new(name: "Energy: I need to get out there and get my hands dirty.", value: "0,1,0"),
        Option.new(name: "Time: I'm in a life transition, and I'm looking to invest in something new.", value: "0,0,1")
      ]),
      Question.new(name: "Describe how you spend your free time:", key: "freetime", options: [
        Option.new(name: "Aside from work or school, I hang out with friends.", value: "1,0,0"),
        Option.new(name: "What free time? ", value: "0,1,0"),
        Option.new(name: "That’s an open question.", value: "0,0,1")
      ]),
      Question.new(name: "What's your organizational style?", key: "org", options: [
        Option.new(name: "Around school or work.", value: "1,0,0"),
        Option.new(name: "Super tight on time, so I try to stick to a schedule.", value: "0,1,0"),
        Option.new(name: "I have things pretty much in order.", value: "0,0,1")
      ]),
      Question.new(name: "What do you most crave from civic life?", key: "crave", options: [
        Option.new(name: "Change: immediately, now, for the future.", value: "1,0,0"),
        Option.new(name: "A slowdown on the news cycle, please.", value: "0,1,0"),
        Option.new(name: "Inclusiveness: hearing less from either extreme.", value: "0,0,1")
      ]),
      Question.new(name: "What’s the most pressing issue for you?", key: "pressing", options: [
        Option.new(name: "Climate Change", value: "0,0,0"),
        Option.new(name: "Economic inequality", value: "0,0,0"),
        Option.new(name: "Advocating for marginalized groups", value: "0,0,0")
      ]),
      Question.new(name: "What is something you feel like you don't have?", key: "lack", options: [
        Option.new(name: "I just have no time.", value: "1,0,0"),
        Option.new(name: "I'd like to have more focus on issues.", value: "0,1,0"),
        Option.new(name: "I feel sort of out-of-the-loop.", value: "0,0,1")
      ]),
      Question.new(name: "What do you consider your biggest strength?", key: "strength", options: [
        Option.new(name: "I have a deep and strong network.", value: "1,0,0"),
        Option.new(name: "I have a ton of energy and I’m very motivated.", value: "0,1,0"),
        Option.new(name: "I have a lot of experience with working through complicated life problems.", value: "0,0,1")
      ]),
      Question.new(name: "Which superpower?", key: "superpower", options: [
        Option.new(name: "To be quantum, so I can be in more than one place at a time", value: "0,0,0"),
        Option.new(name: "Super strength", value: "0,0,0"),
        Option.new(name: "Telepathy (reading others thoughts)", value: "0,0,0")
      ])
    ]
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end
