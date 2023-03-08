# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts 'Seeding data...'
User.destroy_all
Course.destroy_all
Review.destroy_all
Friendship.destroy_all

u1 = User.create( name: "robert", email: "bobmail@gmail.com", password: "robert123")
u2 = User.create( name: "adrian", email: "barbarian44@gmail.com", password: "adrian123")
u3 = User.create( name: "keith", email: "keithreef@gmail.com", password: "keith123")
u4 = User.create( name: "william", email: "williamtell@gmail.com", password: "william123")
u5 = User.create( name: "ian", email: "ianmian@gmail.com", password: "ian123")
u6 = User.create( name: "jason", email: "whitethunder@gmail.com", password: "jason123")
u7 = User.create( name: "john", email: "iamhim@gmail.com", password: "john123")

Friendship.create(sender_id: u1.id, recipient_id: u2.id)
Friendship.create(sender_id: u1.id, recipient_id: u3.id)
Friendship.create(sender_id: u2.id, recipient_id: u4.id)
Friendship.create(sender_id: u4.id, recipient_id: u5.id)
Friendship.create(sender_id: u6.id, recipient_id: u1.id)

g1 = Course.create(user_id: u1, name: "Robert's Course Hole #1", description: "TBD", features: "TBD", par: 3, img_url: 'https://golf-pass.brightspotcdn.com/dims4/default/7731026/2147483647/strip/true/crop/500x323+0+5/resize/930x600!/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F98%2F2e%2F217f2f83aaa1bfd785fec33958e2%2F16744.jpg')
g2 = Course.create(user_id: u2, name: "Funky Town Hole #2", description: "TBD", features: "TBD", par: 4, img_url: 'https://www.pebblebeach.com/content/uploads/PB-17-Mile-Drive-Joann-Dost-2.jpg')
g3 = Course.create(user_id: u3, name: 'Larchmont Blues', description: "TBD", features: "TBD", par: 5, img_url: 'https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2019/01/14/5c3bf24cf193692d16a72559_186%20-%20Torrey%20Pines%20G...')
g4 = Course.create(user_id: u4, name: "Keith's Maw", description: "TBD", features: "TBD", par: 4, img_url: 'https://www.andaluciagolf.com/images/NEWS246/Augusta%20National%2012.jpg')
g5 = Course.create(user_id: u5, name: 'Lakewood Country Club', description: "TBD", features: "TBD", par: 4, img_url: 'https://www.lakewoodgolfcc.com/app/uploads/sites/21/2020/08/LKWD-2012-04-03-4285-1024x683.jpg')
g6 = Course.create(user_id: u6, name: 'Saint Andrews Royal Country Club', description: "TBD", features: "TBD", par: 3, img_url: 'https://www.linksgolfstandrews.com/wp-content/uploads/2015/07/St-Andrews-Golf-Week.jpg')
g7 = Course.create(user_id: u7, name: 'The Lakes', description: "TBD", features: "TBD", par: 5, img_url: 'https://s3.topgolf.com/uploads/images/venue/usa/el-segundo/golf-course/drone-shots/teg-tlaes-2022-03-09-032.jpg?resize.width=1200&resize.height=630&resize.method=cover')

Review.create(user: u1, course: g1, id: 1, favorite: true, comment: "Great idea for placement of bunkers and sloped green. Could use more space for the fairway and maybe different types of rough.", rating: 6)
Review.create(user: u5, course: g2, id: 2, favorite: true, comment: "Putting the green behind a curtain of trees going dog leg left will make this a challenging hole.", rating: 8)
Review.create(user: u3, course: g3, id: 3, favorite: true, comment: "If I could play one course for the rest of my life, this just might be it.", rating: 9)
Review.create(user: u2, course: g4, id: 4, favorite: true, comment: "My father and I used to play a course near home that had a setup Just like this. It was my favorite hole so I think you are exactly on the right track!", rating: 9)
Review.create(user: u6, course: g5, id: 5, favorite: false, comment: "I think you are onto something but the hole is simply not challenging enough as it is just a straight fairway with no hazards...", rating: 5)
Review.create(user: u4, course: g6, id: 6, favorite: true, comment: "The way you placed bermuda rough around elevated greens is genius. ", rating: 8)
Review.create(user: u7, course: g7, id: 7, favorite: false, comment: "I think the ideas are there, you just need to look at some more examples of courses to see what may make sense.", rating: 4)



puts 'Done seeding!'